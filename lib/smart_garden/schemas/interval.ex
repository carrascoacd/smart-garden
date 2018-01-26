defmodule SmartGarden.Interval do
  use Ecto.Schema, otp_app: :smart_garden
  import Ecto.Changeset
  
  alias SmartGarden.Interval

  schema "intervals" do
    field :name, :string
    field :value, :float
    timestamps()
  end

  def changeset(%Interval{} = interval, attrs) do
    interval
    |> cast(attrs, [:name, :value])
    |> validate_required([:name, :value])
    |> unique_constraint(:name)
  end
end