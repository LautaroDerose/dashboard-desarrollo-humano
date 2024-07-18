'use client'

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { FiCalendar } from "react-icons/fi";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { cn } from "@/lib/utils"; // Asegúrate de tener esta utilidad
import { es } from "date-fns/locale"
import { createAssignment, getRecipientsAndBenefits } from "@/actions/assignment-actions";
import { createBenefit, getBenefitCategories } from "@/actions/benefit-action";


// export default function FormActionBenefit({ benefits, benefitCategories }) {
export default function FormActionBenefit() {
  
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
 
  useEffect(() => {
    async function fetchData() {
      const data = await getBenefitCategories();
      setCategories(data);
    }
    fetchData();
  }, []);

  return (
    <div>
      <form action={createBenefit} className=" flex flex-col gap-4" >

          <select
              name="category_id"
              className="w-full px-2 py-1 rounded-sm"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                <p>{category.name}</p>
              </option>
            ))}
          </select>

          <input
            type="text"
            name="name"
            placeholder="name"
            className="w-full px-2 py-1 rounded-sm"
          />

        <Button type="submit">
          Crear Beneficio
        </Button>
      </form>
    </div>
  );
}