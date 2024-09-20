'use client'

import * as React from 'react';
import { useState } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { MultiSelector, MultiSelectorContent, MultiSelectorInput, MultiSelectorItem, MultiSelectorList, MultiSelectorTrigger } from '@/components/ui/multi-select';

export function SelectorRecipient({ recipients }) {
  const [selectedRecipients, setSelectedRecipients] = useState([]);

  return (
    <div>
      <MultiSelector
        // Manejador del cambio en la selección de destinatarios
        onValuesChange={(values) => setSelectedRecipients(values)}
        values={selectedRecipients}
      >
        <MultiSelectorTrigger>
          <MultiSelectorInput placeholder="Seleccione uno o varios destinatarios" />
        </MultiSelectorTrigger>
        <MultiSelectorContent>
          <MultiSelectorList>
            <ScrollArea className="h-40">
              {Array.isArray(recipients) && recipients.length > 0 && recipients.map((recipient) => (
                <MultiSelectorItem key={recipient.id} value={recipient.id}>
                  <div className="flex items-center space-x-2">
                    <span>{recipient.first_name} {recipient.last_name}</span>
                  </div>
                </MultiSelectorItem>
              ))}
            </ScrollArea>
          </MultiSelectorList>
        </MultiSelectorContent>
      </MultiSelector>
      {/* Input hidden para enviar los IDs seleccionados */}
      <input
        type="hidden"
        name="recipients"
        value={JSON.stringify(selectedRecipients)}
      />
    </div>
  );
}