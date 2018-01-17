defmodule SmartGarden.Interval do
  use Ecto.Schema, otp_app: :smart_garden
  import Ecto.Changeset
  
  schema "intervals" do
    field :name, :string
    field :value, :float
    timestamps()
  end

  def changeset(interval, params \\ %{}) do
    interval
    |> cast(params, [:name, :value])
    |> validate_required([:name, :value])
    |> unique_constraint(:name)
  end
end