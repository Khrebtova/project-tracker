class Api::ClientsController < ApplicationController
    #before_action :authorize
    
    # GET /clients
    def index
        @clients = Client.all
        render json: @clients, status: :ok        
    end

    def create
        @client = Client.create(client_params)
        if @client.valid?
            render json: @client, status: :created
        else
            render json: {errors: @client.errors.full_messages}, status: :unprocessable_entity
        end
    end

    # GET /clients/1
    def show        
        client = find_client
        if client 
            render json: client, status: :ok
        else
            render json: {errors: ["Client not found"]}, status: :not_found
        end 
    end

    # DELETE /clients/1
    def destroy
        @client = find_client
        if @client&&@client.projects.length == 0
            @client.destroy
            head :no_content, status: :ok
        else
            render json: {errors: ["Client not found or Client has ongoing projects"]}, status: :not_found
        end
    end

    private
    def client_params
        params.permit(:name)
    end

    def find_client
        Client.find_by(id: params[:id])
    end

    # authorize the user
    def authorize
        render json: {errors: ["Unauthorized"]}, status: :unauthorized unless session.include? :user_id
    end
end
