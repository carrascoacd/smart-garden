defmodule SmartGardenWeb.Router do
  use SmartGardenWeb, :router

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_flash
    plug :protect_from_forgery
    plug :put_secure_browser_headers
  end

  pipeline :api do
    plug :accepts, ["json"]
  end

  scope "/", SmartGardenWeb do
    pipe_through :browser # Use the default browser stack

    get "/", PageController, :index
  end

  # Other scopes may use custom stacks.
  scope "/api", SmartGardenWeb do
    pipe_through :api
    resources "/devices", DeviceController do
      resources "/intervals", IntervalController
      resources "/weather_entries", WeatherEntriesController
    end
  end
end
