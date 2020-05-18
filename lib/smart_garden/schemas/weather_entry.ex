defmodule SmartGarden.WeatherEntry do
  use Ecto.Schema, otp_app: :smart_garden
  import Ecto.Changeset
  import Ecto.Query, warn: false

  alias SmartGarden.WeatherEntry
  alias SmartGarden.Repo

  @allowed_params [
    :moisture,
    :temperature,
    :humidity,
    :device_id,
    :main_voltage,
    :secondary_voltage,
    :volume,
    :state
  ]

  schema "weather_entries" do
    field(:moisture, :float, default: 0.0)
    field(:temperature, :float, default: 0.0)
    field(:humidity, :float, default: 0.0)
    field(:main_voltage, :integer, default: 0)
    field(:secondary_voltage, :integer, default: 0)
    field(:volume, :float, default: 0.0)
    field(:state, :string)
    belongs_to(:device, SmartGarden.Device)
    timestamps()
  end

  def get_all_by_device(device_id, limit \\ 100) do
    Repo.all(all_query(device_id, limit))
  end

  def get_last(device_id) do
    Repo.one(all_query(device_id, 1))
  end

  def maybe_insert(changeset = %{changes: %{device_id: device_id}}) do
    Repo.transaction(fn ->
      if recent_insertion(device_id) do
        Repo.rollback(changeset)
      else
        {:ok, weather_entry} = Repo.insert(changeset)
        weather_entry
      end
    end)
  end

  def changeset(%WeatherEntry{} = weather_entry, attrs) do
    attrs = %{attrs | "state" => map_state(attrs["state"])}

    weather_entry
    |> cast(attrs, @allowed_params)
    |> validate_required([:moisture, :temperature, :humidity, :device_id])
  end

  defp map_state(_state_value = 0), do: "close"
  defp map_state(_state_value), do: "open"

  defp recent_insertion(device_id) do
    case get_last(device_id) do
      nil ->
        false

      entry ->
        NaiveDateTime.diff(NaiveDateTime.utc_now(), entry.inserted_at) <= 15 * 60
    end
  end

  defp all_query(device_id, limit) do
    from(i in WeatherEntry,
      where: i.device_id == ^device_id,
      order_by: [desc: i.inserted_at],
      limit: ^limit
    )
  end
end
