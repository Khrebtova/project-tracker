class Api::TodosController < ApplicationController
    # before_action :authorize 

    def create
        todo = Todo.create(todo_params)
        if todo.valid?
            render json: todo, status: :created
        else
            render json: { errors: todo.errors.full_messages }, status: :unprocessable_entity
        end        
    end

    def destroy
        todo = Todo.find_by(id: params[:id])
        if todo
            todo.destroy
            head :no_content, status: :ok
        else
            render json: { errors: ["Todo not found"] }, status: :not_found
        end
    end

    private 

    def todo_params
        params.require(:todo).permit(:description, :user_id)
    end

    def authorize
        render json: {errors: ["Unauthorized"]}, status: :unauthorized unless session.include? :user_id
    end
end
