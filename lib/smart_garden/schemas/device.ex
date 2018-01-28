defmodule SmartGarden.Device do
  use Ecto.Schema, otp_app: :smart_garden
  import Ecto.Changeset
  import Ecto.Query, warn: false

  alias SmartGarden.Device

  schema "devices" do
    field :name, :string
    has_many :weather_entries, SmartGarden.WeatherEntry
    timestamps()
  end

  def get_all_with_weather_entries do
    query = from(d in SmartGarden.Device,
      preload: [:weather_entries],
      select: d)
    query
      |> SmartGarden.Repo.all
  end

  def changeset(%Device{} = device, attrs) do
    device
    |> cast(attrs, [:name])
    |> validate_required([:name])
    |> unique_constraint(:name)
  end

end