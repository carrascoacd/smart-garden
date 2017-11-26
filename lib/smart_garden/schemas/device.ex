defmodule SmartGarden.Device do
  use Ecto.Schema, otp_app: :smart_garden

  schema "devices" do
    field :name, :string
    timestamps()
  end
end