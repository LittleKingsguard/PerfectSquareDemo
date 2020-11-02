require "application_system_test_case"

class SquaresTest < ApplicationSystemTestCase
  setup do
    @square = squares(:one)
  end

  test "visiting the index" do
    visit squares_url
    assert_selector "h1", text: "Squares"
  end

  test "creating a Square" do
    visit squares_url
    click_on "New Square"

    fill_in "Matrix", with: @square.matrix
    click_on "Create Square"

    assert_text "Square was successfully created"
    click_on "Back"
  end

  test "updating a Square" do
    visit squares_url
    click_on "Edit", match: :first

    fill_in "Matrix", with: @square.matrix
    click_on "Update Square"

    assert_text "Square was successfully updated"
    click_on "Back"
  end

  test "destroying a Square" do
    visit squares_url
    page.accept_confirm do
      click_on "Destroy", match: :first
    end

    assert_text "Square was successfully destroyed"
  end
end
