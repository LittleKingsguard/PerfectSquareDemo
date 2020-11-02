Rails.application.routes.draw do
  root 'homepage#index'
  resources :squares
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
