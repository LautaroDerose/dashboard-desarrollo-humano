'use client'
import FormattedDate from '@/components/formatted-data';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { disableObservation } from "@/actions/other-actions/credencial-actions";

export default function ObservationCard({ observation }) {
  const [error, setError] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleSubmit = async (formData) => {
    setError(null);
    try {
      await disableObservation(formData); // Server action
      alert("Observación eliminada con éxito.");
      setShowConfirmation(false)
    } catch (error) {
      setError(error.message);
      alert(error.message); // Mostrar el mensaje de error al usuario
    }
  };

  const handleConfirm = (e) => {
    e.preventDefault();
    setShowConfirmation(true);
  };


  return (
    <div className="bg-slate-200 text-slate-800 p-4 mb-2 rounded">
      <div>
        <div className="flex items-center justify-between">
          <h1 className="font-bold">{observation.author}</h1>
          <h3>
            <FormattedDate date={observation.created_at} fallback="No se registró fecha" />
          </h3>
        </div>
        <h2 className="text-lg">{observation.subject}</h2>
        <p>{observation.text}</p>
      </div>
      <form 
        action={ async (formData) => {
          handleSubmit(formData)
        }} 
        className="flex justify-end"
      >
        <input type="hidden" name="observationId" value={observation.id} />
        <Button variant="destructive" onClick={handleConfirm}>
          Borrar observación
        </Button>
      {/* Modal de confirmación */}
      {showConfirmation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow-lg">
            <h2>¿Confirmar eliminación?</h2>
            <p className="text-slate-700">
              <strong>Autor:</strong> {observation.author}
            </p>
            <p className="text-slate-700">
              <strong>Asunto:</strong> {observation.subject}
            </p>
            <p className="text-slate-700">
              <strong>Texto:</strong> {observation.text}
            </p>

            <div className="flex justify-between mt-4">
              <Button onClick={() => setShowConfirmation(false)} className="bg-gray-500">
                Cancelar
              </Button>
              <Button type="submit" className="bg-red-500">
                Confirmar
              </Button>
            </div>
          </div>
        </div>
      )}
      </form>

    </div>
  );
}