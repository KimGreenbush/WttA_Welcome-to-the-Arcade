from django.test import TestCase
import bcrypt
from apps.Arcade.models import Player

def create_test_player(username, email, password, pass_confirm):
    player = {
        "username" : username,
        "email" : email,
        "password" : password,
        "pass_confirm" : pass_confirm,
    }
    return Player.objects.register_validator(player)

def validate_test_player(email, password):
    user = {
        "email": email,
        "password": password
    }
    return Player.objects.login_validator(user)

class RegistrationValidationTestCase(TestCase):
    def test_validate_user(self):
        a_user = create_test_player("Kim", "test@test.com", "Secure123", "Secure123")
        self.assertEquals(len(a_user), 0)

    def test_username_less_than_three(self):
        short_username = create_test_player("Ki", "test@test.com", "Secure123", "Secure123")
        self.assertGreater(len(short_username), 0)

    def test_username_greater_than_nine(self):
        long_username = create_test_player("Kimberleyy", "test@test.com", "Secure123", "Secure123")
        self.assertGreater(len(long_username), 0)

    def test_email_isUnavailable(self):
        Player.objects.create(username="Kim", email="test@test.com", password="Secure123")
        unavailable_email = create_test_player("Kimberley", "test@test.com", "Secure123", "Secure123")
        self.assertGreater(len(unavailable_email), 0)

    def test_email_regex(self):
        bad_email = create_test_player("Kimberley", "test@test", "Secure123", "Secure123")
        self.assertGreater(len(bad_email), 0)

    def test_password_less_than_eight(self):
        bad_pass = create_test_player("Kimberley", "test@test.com", "NotSafe", "Secure123")
        self.assertGreater(len(bad_pass), 0)

    def test_confirm_password_match(self):
        pass_not_matching = create_test_player("Kimberley", "test@test.com", "NotSafe", "Secure123")
        self.assertGreater(len(pass_not_matching), 0)


class LoginValidationTestCase(TestCase):
    def test_no_player(self):
        not_a_registered_email = validate_test_player("notanemail@notadomain.com", "Secure123")
        self.assertGreater(len(not_a_registered_email), 0)

    def test_player_password_matches_input(self):
        pw_hash = bcrypt.hashpw("Secure123".encode(), bcrypt.gensalt()).decode()
        Player.objects.create(username="Kim", email="test@test.com", password=pw_hash)
        invalid_pass = validate_test_player("test@test.com", "Hackers1!")
        self.assertGreater(len(invalid_pass), 0)