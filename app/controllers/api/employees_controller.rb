class Api::EmployeesController < ApplicationController
    #before_action :authorize

    # GET /employees
    def index        
        employees = Employee.all    
        render json: employees, status: :ok
    end
    
     # GET /employees/1
    def show        
        employee = Employee.find(params[:id])
        if employee
            render json: employee, status: :ok
        else
            render json: {errors: ["Employee not found"]}, status: :not_found
        end
    end

    # POST /employees
    def create        
        employee = Employee.create(employee_params)
        if employee.valid?
            render json: employee, status: :created
        else
            render json: {errors: employee.errors.full_messages}, status: :unprocessable_entity
        end        
    end

     # DELETE /employees/1
    def destroy       
        @employee = find_employee
        if @employee&&@employee.projects.length == 0
            @employee.destroy
            head :no_content, status: :ok
        else
            render json: {errors: ["Employee not found or has ongoing projects"]}, status: :not_found
        end   
    end

    private

    def employee_params
        params.permit(:name, :title)
    end

    def find_employee
        Employee.find_by(id: params[:id])
    end

    # authorize the user
    def authorize
        render json: {errors: ["Unauthorized"]}, status: :unauthorized unless session.include? :user_id
    end
end
