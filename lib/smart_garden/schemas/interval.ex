defmodule SmartGarden.Interval do
  use Ecto.Schema, otp_app: :smart_garden
  import Ecto.Changeset
  import Ecto.Query, warn: false

  alias SmartGarden.Interval

  schema "intervals" do
    field :name, :string
    field :value, :integer
    field :action, :string
    field :execution_schedule, :string
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
    |> cast(attrs, [:name, :value, :action, :execution_schedule, :device_id])
    |> validate_required([:name, :value, :action, :execution_schedule, :device_id])
    |> validate_inclusion(:action, ["open-valve", "polling"])
  end

end