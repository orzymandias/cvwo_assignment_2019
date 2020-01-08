Rails.application.routes.draw do
  root to: "welcome#index"

  namespace :api do
    jsonapi_resources :tags
    jsonapi_resources :tasks

  end

  get "*path", to: "welcome#index", constraints: { format: "html" }

  
end
