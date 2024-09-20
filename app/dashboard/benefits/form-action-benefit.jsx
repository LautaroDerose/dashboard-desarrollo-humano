'use client'

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { createBenefit, getBenefitCategories } from "@/actions/benefit-action";


export default function FormActionBenefit({ benefitCategories }) {
  const categories = benefitCategories; 
  const [selectedCategory, setSelectedCategory] = useState("");

  if (!categories || categories.length === 0) {
    return <div>No hay categorías disponibles</div>; 
  }

  return (
    <div>
      <form action={createBenefit} className="flex flex-col gap-4">
        <select
          name="category_id"
          className="w-full px-2 py-1 rounded-sm"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>

        <input
          type="text"
          name="name"
          placeholder="Nombre del beneficio"
          className="w-full px-2 py-1 rounded-sm"
        />

        <Button type="submit">Crear Beneficio</Button>
      </form>
    </div>
  );
}