import { useForm } from "react-hook-form";
import apiClient from "../../apis/axios";
export const BasicTextProject=({setProjectId ,setProjectType, nextStep})=>{

    
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
      } = useForm({defaultValues:{type:'project', start_date:null, completion_date:null}});
    
      const type = watch("type"); // Watch the type field to determine category options
    
      const categoryOptions = {
        project: ["Residential", "Commercial"],
        land: ["Lease", "Sale"],
        hotel: ["Rent", "Sale", "Lease"],
      };
    
      const onSubmit = async (data) => {
        if (data.start_date === "") data.start_date = null;
        if (data.completion_date === "") data.completion_date = null;
    
       try {
        const response =await apiClient.post('/project/basic', data)
        if(response.status === 201 ){
            
            setProjectId(response.data.data.project_id)
            setProjectType(response.data.data.type);
          
            nextStep()
        }
       } catch (error) {
        console.log(error)
        
       }
      };
    
    
      return(
        <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white shadow-lg rounded-lg p-6 w-full max-w-2xl"
      >
        <h1 className="text-2xl font-bold text-gray-700 mb-6">Upload Project</h1>

        {/* Name */}
        <div className="mb-4">
          <label className="block text-gray-600 font-medium mb-2">Name</label>
          <input
            {...register("name", { required: "Name is required" })}
            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter project name"
          />
          {errors.name && (
            <span className="text-red-500 text-sm">{errors.name.message}</span>
          )}
        </div>

        {/* Description */}
        <div className="mb-4">
          <label className="block text-gray-600 font-medium mb-2">Description</label>
          <textarea
            {...register("description")}
            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter project description"
          ></textarea>
        </div>

        {/* Type */}
        <div className="mb-4">
          <label className="block text-gray-600 font-medium mb-2">Type</label>
          <select
            {...register("type", { required: "Type is required" })}
            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            
          >
            <option value="project" >Project</option>
            <option value="land">Land</option>
            <option value="hotel">Hotel</option>
          </select>
          {errors.type && (
            <span className="text-red-500 text-sm">{errors.type.message}</span>
          )}
        </div>

        {/* Category */}
        {/* Category */}
        <div className="mb-4">
          <label className="block text-gray-600 font-medium mb-2">Category</label>
          <select
            {...register("category", { required: "Category is required" })}
            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={!type} // Disable when no type is selected
          >
            <option value="">Select Category</option>
            {type &&
              categoryOptions[type].map((option) => (
                <option key={option} value={option.toLowerCase()}>
                  {option}
                </option>
              ))}
          </select>
          {errors.category && (
            <span className="text-red-500 text-sm">{errors.category.message}</span>
          )}
        </div>

        {/* Location */}
        <fieldset className="mb-4">
          <legend className="block text-gray-600 font-medium mb-2">Location</legend>
          <div className="grid grid-cols-2 gap-4">
            <select
              {...register("location.city", {required:'city is required'})}
              className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              
            >
                <option  value={"indore"}>Indore</option>
                <option  value={"bhopal"}>Bhopal</option>
                <option  value={"lucknow"}>Lucknow</option>
                <option  value={"chandigarh"}>Chandigar</option>
                <option  value={"jabalpur"}>jabalpur</option>
                <option  value={"shimla"}>shimla</option>
                <option  value={"vidisha"}>vidisha</option>
                <option  value={"dahna"}>dahna</option>
            </select>
            <input
              {...register("location.state", {required: 'state is required'})}
              className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="State"
            />
            <input
              {...register("location.landmark", {required:'landmark is required'})}
              className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Landmark"
            />
            <input
              {...register("location.address", {required:'address is required'})}
              className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Address"
            />
            <input
              {...register("location.coordinates.latitude", { valueAsNumber: true })}
              className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Latitude"
              type="number"
            />
            <input
              {...register("location.coordinates.longitude", { valueAsNumber: true })}
              className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Longitude"
              type="number"
            />
          </div>
        </fieldset>

        {/* Price Range */}
        <fieldset className="mb-4">
          <legend className="block text-gray-600 font-medium mb-2">Price Range</legend>
          <div className="grid grid-cols-2 gap-4">
            <input
              {...register("price_range.min", { valueAsNumber: true })}
              className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Min Price"
              type="number"
            />
            <input
              {...register("price_range.max", { valueAsNumber: true })}
              className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Max Price"
              type="number"
            />
          </div>
        </fieldset>

        {/* Start Date */}
        <div className="mb-4">
          <label className="block text-gray-600 font-medium mb-2">Start Date</label>
          <input
            {...register("start_date")}
            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="date"
            
            
          />
        </div>

        {/* Completion Date */}
        <div className="mb-4">
          <label className="block text-gray-600 font-medium mb-2">Completion Date</label>
          <input
            {...register("completion_date")}
            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="date"
          />
        </div>

        {/* Total Units */}
        <div className="mb-4">
          <label className="block text-gray-600 font-medium mb-2">Total Units</label>
          <input
            {...register("total_units", { valueAsNumber: true })}
            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="number"
          />
        </div>

          {/* project area */}
        <div className="mb-4">
          <label className="block text-gray-600 font-medium mb-2">project area in acres</label>
          <input
            {...register("project_area", { valueAsNumber: true })}
            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="number"
          />
        </div>



        <div className="mb-4">
          <label className="block text-gray-600 font-medium mb-2">RERA ID</label>
          <input
            {...register("rera_id")}
            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            
          />
        </div>





        {/* land extra */}

        {type==='land' && <fieldset className="mb-4">
          <legend className="block text-gray-600 font-medium mb-2">land extra</legend>
          <div className="grid grid-cols-2 gap-4">
            <input
              {...register("land_extra.approach")}
              className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="approach road"
            />
            <input
              {...register("land_extra.fencing")}
              className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="fencing"
            />
            <input
              {...register("land_extra.position")}
              className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="position"
            />
                
            <input
              {...register("land_extra.distance_form_orr")}
              className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="distance from orr"
            />
            <input
              {...register("land_extra.soil_type")}
              className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="soil type"
            />
          </div>
        </fieldset>}

        <div className="mb-4">
          <label className="block text-gray-600 font-medium mb-2">Why us</label>
          <textarea
            {...register("why_us")}
            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            
          ></textarea>
        </div>

        <div className="mb-4">
          <label className="block text-gray-600 font-medium mb-2">properties list</label>
          <input
            {...register("project_properties")}
            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="total no. of building in a project"
          ></input>
        </div>



        {type==='hotel' &&
        <fieldset className="mb-4">
          <legend className="block text-gray-600 font-medium mb-2">Hotel extra</legend>
          <div className="grid grid-cols-2 gap-4">
            <input
              {...register("hotel_extra.rental_yield")}
              className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                type="number"
                placeholder="rental  yield (in percent)"
            />
                
            
            <input
              {...register("hotel_extra.accessibility")}
              className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="wheel chair access available"
            />

            <input
              {...register("hotel_extra.additional_room")}
              className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="additional rooms"
            />
          </div>
        </fieldset>}











        {/* builder */}
        <div className="mb-4">
          <label className="block text-gray-600 font-medium mb-2">builder name</label>
          <input
            {...register("builder_name", {required:'builder name is required'})}
            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            
          />
           {errors.builder_name && (
            <span className="text-red-500 text-sm">{errors.builder_name.message}</span>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-gray-600 font-medium mb-2">builder description</label>
          <textarea
            {...register("builder_description", {required:'builder description is required'})}
            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="description"
          />
           {errors.builder_description && (
            <span className="text-red-500 text-sm">{errors.builder_description.message}</span>
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

      )
}