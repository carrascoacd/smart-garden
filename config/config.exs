# This file is responsible for configuring your application
# and its dependencies with the aid of the Mix.Config module.
#
# This configuration file is loaded before any dependency and
# is restricted to this project.
use Mix.Config

config :phoenix, :json_library, Jason

# General application configuration
config :smart_garden,
  ecto_repos: [SmartGarden.Repo]

# Configures the endpoint
config :smart_garden, SmartGardenWeb.Endpoint,
  url: [host: "localhost"],
  secret_key_base: "rYUXYfFbW/3aUugpY9DHD+2g9G6mH9wUqh7j+hrJYIvgJZlf1qPb1y0VPcz3jJXr",
  render_errors: [view: SmartGardenWeb.ErrorView, accepts: ~w(html json)]

# Configures Elixir's Logger
config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:request_id]

# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{Mix.env}.exs"
