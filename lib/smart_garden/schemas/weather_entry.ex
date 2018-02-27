defmodule SmartGarden.WeatherEntry do
  use Ecto.Schema, otp_app: :smart_garden
  import Ecto.Changeset
  import Ecto.Query, warn: false

  alias SmartGarden.WeatherEntry

  schema "weather_entries" do
    field :moisture, :float
    belongs_to :device, SmartGarden.Device
    timestamps()
  end

  def get_all_by_device(device_id) do
    query = from(i in WeatherEntry,
              where: i.device_id == ^device_id)
    query
      |> SmartGarden.Repo.all
  end

  def changeset(%WeatherEntry{} = weather_entry, attrs) do
    weather_entry
    |> cast(attrs, [:moisture, :device_id])
    |> validate_required([:moisture, :device_id])
  end

end