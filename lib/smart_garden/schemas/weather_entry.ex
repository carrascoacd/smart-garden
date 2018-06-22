defmodule SmartGarden.WeatherEntry do
  use Ecto.Schema, otp_app: :smart_garden
  import Ecto.Changeset
  import Ecto.Query, warn: false

  alias SmartGarden.WeatherEntry

  schema "weather_entries" do
    field :moisture, :float
    field :temperature, :float
    field :humidity, :float
    belongs_to :device, SmartGarden.Device
    timestamps()
  end

  def get_all_by_device(device_id, limit \\ 100) do
    query = from(i in WeatherEntry,
              where: i.device_id == ^device_id,
              order_by: [desc: i.inserted_at],
              limit: ^limit)
    query
      |> SmartGarden.Repo.all
  end

  def changeset(%WeatherEntry{} = weather_entry, attrs) do
    weather_entry
    |> cast(attrs, [:moisture, :temperature, :humidity, :device_id])
    |> validate_required([:moisture, :temperature, :humidity, :device_id])
  end

end