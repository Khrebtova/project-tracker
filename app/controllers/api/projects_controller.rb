class Api::ProjectsController < ApplicationController
    #before_action :authorize

    # GET /projects
    def index
        @projects = Project.all.order(:updated_at).reverse
        render json: @projects        
    end

    # GET /projects/1
    def show        
        @project = find_project
        if @project 
            render json: @project, status: :ok
        else
            render json: {errors: ["Project not found"]}, status: :not_found
        end        
    end

    # POST /projects
    def create
        @project = Project.create(project_params)
        if @project.valid?
            render json: @project, status: :created
        else
            render json: {errors: @project.errors.full_messages}, status: :unprocessable_entity
        end        
    end

    # PATCH/PUT /projects/1
    def update
        @project = find_project
        if @project
            @project.update(project_params)
            render json: @project, status: :ok
        else
            render json: {errors: @project.errors.full_messages}, status: :unprocessable_entity
        end        
    end

    # DELETE /projects/1
    def destroy
        @project = find_project
        if @project
            @project.destroy
            head :no_content, status: :ok
        else
            render json: {errors: ["Project_not_found"]}, status: :not_found
        end
    end

    private
    
    def find_project
        Project.find_by(id: params[:id])
    end

    # Only allow a list of trusted parameters through.
    def project_params
        params.require(:project).permit(:name, :completed, :client_id, :employee_id)
    end

    # authorize the user
    def authorize
        render json: {errors: ["Unauthorized"]}, status: :unauthorized unless session.include? :user_id
    end
end
