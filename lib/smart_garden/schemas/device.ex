defmodule SmartGarden.Device do
  use Ecto.Schema, otp_app: :smart_garden
  import Ecto.Changeset
  import Ecto.Query, warn: false

  alias SmartGarden.Device

  schema "devices" do
    field(:name, :string)
    has_many(:weather_entries, SmartGarden.WeatherEntry)
    has_many(:intervals, SmartGarden.Interval)
    timestamps()
  end

  def get_all_with_relations do
    query_with_relations()
    |> SmartGarden.Repo.all()
  end

  def get_one_with_relations do
    query_with_relations()
    |> SmartGarden.Repo.one()
  end

  def query_with_relations do
    from(device in SmartGarden.Device,
      preload: [:weather_entries, :intervals],
      select: device
    )
  end

  def changeset(%Device{} = device, attrs) do
    device
    |> cast(attrs, [:name])
    |> validate_required([:name])
    |> unique_constraint(:name)
  end
end
