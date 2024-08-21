"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createDecreeDoc } from "@/actions/doc-actions/doc-subse-actions";
import { useState } from "react";

export default function CreateDecreeDocForm({ assignmentId }) {
  const [error, setError] = useState(null);

  return (
    <form
      action={async (formData) => {
        setError(null);
        try {
          await createDecreeDoc(formData);
          alert("Documento de decreto creado con éxito.");
        } catch (error) {
          setError(error.message);
          alert(error.message); // Mostrar el mensaje de error al usuario
        }
      }}
      className="flex flex-col mt-2"
    >
      <div className="flex gap-2 items-center justify-between">
        <input type="hidden" name="assignmentId" value={assignmentId} />
        <div>
          <Input
            type="text"
            name="doc_number"
            placeholder="Número de Decreto"
            required
          />
        </div>
        <Button type="submit" className="">
          Crear Decreto
        </Button>
      </div>
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </form>
  );
}
// "use client";

// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { createDecreeDoc } from "@/actions/doc-actions/doc-subse-actions";

// export default function CreateDecreeDocForm({ assignmentId }) {
//   return (
//     <form action={createDecreeDoc} className="flex mt-2">
//       <div className="flex gap-2 items-center justify-between">
//         <input type="hidden" name="assignmentId" value={assignmentId} />
//         <div>
//           <Input
//             type="text"
//             name="doc_number"
//             placeholder="Número de Decreto"
//             required
//           />
//         </div>
//         <Button type="submit" className="">
//           Crear Decreto
//         </Button>
//       </div>
//     </form>
//   );
// }