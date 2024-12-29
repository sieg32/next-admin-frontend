import { useForm } from "react-hook-form";
import apiClient from "../../apis/axios";

export const RemarkForm = ({projectId, nextStep}) =>{

     const {
            register,
            handleSubmit,
            
            formState: { errors },
          } = useForm();



          const onSubmit =async (data)=>{
            console.log(data)
            if(!data.remark){
                return nextStep();
            }
            try {
                const response = await apiClient.post( '/project/remark', { projectId, data:data.remark})
                    if(response.status === 201) {
                        nextStep()
                    }else{
                        window.alert('something went wrong');
                        console.log(response)
                        nextStep()
                    }
            } catch (error) {

                window.alert('something went wrong', error);
                console.log(error)
                nextStep()

            }
            

          }
    
    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>

            <div className="mb-4">
          <label className="block text-gray-600 font-medium mb-2">remark</label>
          <textarea
            {...register("remark")}
            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="remark"
          />
           {errors.remark && (
            <span className="text-red-500 text-sm">{errors.remark.message}</span>
          )}
        </div>


         {/* Submit Button */}
         <div className="text-right">
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Submit
          </button>
        </div>

            </form>



        </div>
    )
}