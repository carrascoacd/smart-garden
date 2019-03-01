defmodule SmartGarden.WeatherEntry do
  use Ecto.Schema, otp_app: :smart_garden
  import Ecto.Changeset
  import Ecto.Query, warn: false

  alias SmartGarden.WeatherEntry

  schema "weather_entries" do
    field :moisture, :float
    field :temperature, :float
    field :humidity, :float
    field :main_voltage, :integer
    field :secondary_voltage, :integer
    belongs_to :device, SmartGarden.Device
    timestamps()
  end

  def get_all_by_device(device_id, limit \\ 100) do
    SmartGarden.Repo.all(all_query(device_id, limit))
  end

  def recent_insertion(device_id) do
     case SmartGarden.Repo.one(all_query(device_id, 1)) do
      nil -> 
        false
      entry -> 
        diff = NaiveDateTime.diff(NaiveDateTime.utc_now(), entry.inserted_at)
        diff < 15 * 60
    end
  end 

  def changeset(%WeatherEntry{} = weather_entry, attrs) do
    weather_entry
    |> cast(attrs, [:moisture, :temperature, :humidity, :device_id, :main_voltage, :secondary_voltage])
    |> validate_required([:moisture, :temperature, :humidity, :device_id])
  end

  defp all_query(device_id, limit) do
    from(i in WeatherEntry,
      where: i.device_id == ^device_id,
      order_by: [desc: i.inserted_at],
      limit: ^limit)
  end
end
