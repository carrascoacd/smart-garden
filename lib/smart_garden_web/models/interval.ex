defmodule SmartGarden.Interval do
  use Ecto.Schema

  schema "intervals" do
    field :name, :string
    field :value, :float
    timestamps
  end
end