package main

import "testing"

func TestIsValidEmail(t *testing.T) {
	t.Run("valid emails", func(t *testing.T) {
		valid := []string{
			"user@example.com",
			"test@test.nl",
			"name@domain.co.uk",
		}
		for _, email := range valid {
			if !isValidEmail(email) {
				t.Errorf("expected %q to be valid", email)
			}
		}
	})

	t.Run("missing @", func(t *testing.T) {
		if isValidEmail("userexample.com") {
			t.Error("expected no @ to be invalid")
		}
	})

	t.Run("missing dot", func(t *testing.T) {
		if isValidEmail("user@example") {
			t.Error("expected no dot to be invalid")
		}
	})

	t.Run("contains space", func(t *testing.T) {
		if isValidEmail("user @example.com") {
			t.Error("expected space to be invalid")
		}
	})

	t.Run("too short", func(t *testing.T) {
		if isValidEmail("a@b") {
			t.Error("expected too short to be invalid")
		}
	})

	t.Run("empty string", func(t *testing.T) {
		if isValidEmail("") {
			t.Error("expected empty to be invalid")
		}
	})
}

func TestValidateContact(t *testing.T) {
	t.Run("valid form is trimmed and accepted", func(t *testing.T) {
		form, ok := validateContact(ContactState{Name: "  Ada ", Email: " ada@example.com ", Message: " hi "})
		if !ok {
			t.Fatal("expected valid form")
		}
		if form.Name != "Ada" || form.Email != "ada@example.com" || form.Message != "hi" {
			t.Errorf("expected trimmed fields, got %+v", form)
		}
		if form.StatusType != "" || form.ErrName || form.ErrEmail || form.ErrMessage {
			t.Errorf("expected no errors, got %+v", form)
		}
	})

	t.Run("missing name", func(t *testing.T) {
		form, ok := validateContact(ContactState{Email: "ada@example.com", Message: "hi"})
		if ok || !form.ErrName || form.StatusType != "error" {
			t.Errorf("expected name error, got %+v", form)
		}
	})

	t.Run("missing email", func(t *testing.T) {
		form, ok := validateContact(ContactState{Name: "Ada", Message: "hi"})
		if ok || !form.ErrEmail || form.StatusType != "error" {
			t.Errorf("expected email error, got %+v", form)
		}
	})

	t.Run("invalid email", func(t *testing.T) {
		form, ok := validateContact(ContactState{Name: "Ada", Email: "nope", Message: "hi"})
		if ok || !form.ErrEmail || form.StatusType != "error" {
			t.Errorf("expected invalid email error, got %+v", form)
		}
	})

	t.Run("missing message", func(t *testing.T) {
		form, ok := validateContact(ContactState{Name: "Ada", Email: "ada@example.com", Message: "   "})
		if ok || !form.ErrMessage || form.StatusType != "error" {
			t.Errorf("expected message error, got %+v", form)
		}
	})

	t.Run("previous errors are cleared", func(t *testing.T) {
		form, ok := validateContact(ContactState{Name: "Ada", Email: "ada@example.com", Message: "hi", ErrName: true, StatusType: "error", StatusText: "old"})
		if !ok || form.ErrName || form.StatusType != "" || form.StatusText != "" {
			t.Errorf("expected errors cleared, got %+v", form)
		}
	})
}
