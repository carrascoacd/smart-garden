defmodule SmartGarden.Interval do
  use Ecto.Schema, otp_app: :smart_garden

  schema "intervals" do
    field :name, :string
    field :value, :float
    timestamps()
  end
end