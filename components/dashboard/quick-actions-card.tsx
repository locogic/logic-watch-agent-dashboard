"use client";

import { useEffect, useState } from "react";
import { Card, CardBody, CardHeader } from "@/components/ui/nextui-card";
import { Button } from "@/components/ui/nextui-button";

import { BsCashCoin, BsHouseLock } from "react-icons/bs";
import { PiHandCoinsBold } from "react-icons/pi";
import { Upload } from "lucide-react";
import { MdOutlineCall } from "react-icons/md";

export function QuickActionsCard() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <Card>
        <CardHeader>
          <div className="flex flex-col">
            <h3 className="text-lg font-semibold">Accesos Directo</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Acciones Frecuentes
            </p>
          </div>
        </CardHeader>
        <CardBody className="space-y-2">Cargando...</CardBody>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col">
          <h3 className="text-lg font-semibold">Accesos Directo</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Acciones Frecuentes
          </p>
        </div>
      </CardHeader>
      <CardBody className="space-y-2">
        <Button color="primary" className="w-full justify-start">
          <PiHandCoinsBold className="mr-2 h-4 w-4" />
          Solicitar Nuevo Préstamo
        </Button>
        <Button color="primary" className="w-full justify-start">
          <BsCashCoin className="mr-2 h-4 w-4" />
          Realizar Pago
        </Button>
        <Button color="secondary" className="w-full justify-start">
          <Upload className="mr-2 h-4 w-4" />
          Subir Documento
        </Button>
        <Button color="secondary" className="w-full justify-start">
          <BsHouseLock className="mr-2 h-4 w-4" />
          Registrar Nueva Garantía
        </Button>
        <Button color="success" style={{marginTop: "25px"}} className="w-full justify-start">
          <MdOutlineCall className="mr-2 h-4 w-4" />
          Contáctese con un Asesor
        </Button>
      </CardBody>
    </Card>
  );
}
