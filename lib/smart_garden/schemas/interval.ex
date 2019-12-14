defmodule SmartGarden.Interval do
  use Ecto.Schema, otp_app: :smart_garden
  import Ecto.Changeset
  import Ecto.Query, warn: false

  alias SmartGarden.Interval

  schema "intervals" do
    field :name, :string
    field :value, :integer
    field :action, :string
    field :active, :boolean, default: true
    field :execution_schedule, :string
    field :force_open, :boolean, default: false
    belongs_to :device, SmartGarden.Device
    timestamps()
  end

  def get_all_by_device(device_id) do
    query = from(i in Interval,
              where: i.device_id == ^device_id)
    query
      |> SmartGarden.Repo.all
  end

  def changeset(%Interval{} = interval, attrs) do
    interval
    |> cast(attrs, [:name, :value, :action, :execution_schedule, :device_id, :active, :force_open])
    |> validate_required([:name, :value, :action, :execution_schedule, :device_id])
    |> validate_inclusion(:action, ["open-valve", "close-valve", "reset"])
  end

end