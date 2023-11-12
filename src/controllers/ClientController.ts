/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, Response } from "express";
import { prisma } from "../database";

export default {
  async createClient(request: Request, response: Response) {
    try {
      const { nome, email } = request.body;
      const clientExist = await prisma.user.findUnique({ where: email });

      if (clientExist) {
        return response.json({
          error: true,
          message: "Erro: Cliente já existe!",
        });
      }

      const client = await prisma.user.create({
        data: {
          nome,
          email,
        },
      });

      return response.json({
        error: false,
        message: "Sucesso : Cliente Cadastrado com sucesso!",
      });
    } catch (error) {
      return response.json({ message: error.message });
    }
  },

  async listClientId(request: Request, response: Response) {
    try {
      const { id } = request.params;

      const clientExist = await prisma.user.findUnique({
        where: { id: Number(id) },
      });

      if (!clientExist) {
        return response.json({
          error: true,
          message: "Error : Cliente não encontrado!",
        });
      }

      return response.json({
        error: false,
        clientExist,
      });
    } catch (error) {
      return response.json({ message: error.message });
    }
  },

  async listClient(response: Response) {
    try {
      const clientsExist = await prisma.user.findMany();
      if(clientsExist.length===0){
        return response.json({
          error: true,
          message: "Error : Nenhum cliente encontrado!",
        });
      }
      if (!clientsExist) {
        return response.json({
          error: true,
          message: "Error : Não existe clientes!",
        });
      }
      return response.json({
        error: false,
        clientsExist,
      });
    } catch (error) {
      return response.json({ message: error.message });
    }
  },

  async uptadeClient(request: Request, response: Response) {
    try {
      const { id, nome, email } = request.body;

      const clientExist = await prisma.user.findUnique({
        where: { id: Number(id) },
      });

      if (!clientExist) {
        return response.json({
          error: true,
          message: "Error : Cliente não encontrado!",
        });
      }

      const client = await prisma.user.update({
        where: {
          id: Number(request.body.id),
        },
        data: {
          nome,
          email,
        },
      });

      return response.json({
        error: false,
        message: "Sucesso : Cliente atualizado!",
        client,
      });
    } catch (error) {
      return response.json({ message: error.message });
    }
  },

  async deleteClient(request: Request, response: Response) {
    try {
      const { id } = request.params;

      const clientExist = await prisma.user.findUnique({
        where: { id: Number(id) },
      });

      if (!clientExist) {
        return response.json({
          error: true,
          message: "Error : Cliente não encontrado!",
        });
      }

      const client = await prisma.user.delete({
        where: {
          id: Number(request.body.id),
        },
      });

      return response.json({
        error: false,
        message: "Cliente deletado com sucesso",
        client,
      });
    } catch (error) {
      return response.json({ message: error.message });
    }
  },
};
