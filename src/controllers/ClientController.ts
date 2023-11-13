import { Request, Response } from "express";
import { prisma } from "../database";

export default {
  async createClient(request: Request, response: Response) {
    try {
      const { nome, email } = request.body;

      const clientExist = await prisma.user.findUnique({
        where: {
          email: email,
        },
      });

      if (clientExist) {
        return response.status(400).json({
          error: true,
          message: "Erro: Email já existe!",
        });
      }

      const client = await prisma.user.create({
        data: {
          nome,
          email,
        },
      });

      return response.status(200).json({
        error: false,
        message: "Sucesso : Cliente Cadastrado com sucesso!",
        client,
      });
    } catch (error) {
      return response.status(500).json({ message: error.message });
    }
  },

  async listClientId(request: Request, response: Response) {
    try {
      const { id } = request.params;

      const clientExist = await prisma.user.findUnique({
        where: { id: Number(id) },
      });

      if (!clientExist) {
        return response.status(404).json({
          error: true,
          message: "Error : Cliente não encontrado!",
        });
      }

      return response.status(200).json({
        error: false,
        clientExist,
      });
    } catch (error) {
      return response.status(500).json({ message: error.message });
    }
  },

  async listClient(request: Request, response: Response) {
    try {
      const clients = await prisma.user.findMany();

      if (!clients || clients.length === 0) {
        return response.status(404).json({
          error: true,
          message: "Error : Nenhum cliente encontrado!",
        });
      }

      return response.status(200).json({
        error: false,
        clients,
      });
    } catch (error) {
      return response.status(500).json({ message: error.message });
    }
  },

  async uptadeClient(request: Request, response: Response) {
    try {
      const { id } = request.params;
      const { nome, email } = request.body;
      const clientExist = await prisma.user.findUnique({
        where: { id: Number(id) },
      });

      if (!id) {
        return response.status(400).json({
          error: true,
          message: "Erro: ID do cliente não fornecido.",
        });
      }

      const existingEmail = await prisma.user.findUnique({
        where: {
          email: email,
        },
      });

      if (!clientExist) {
        return response.status(404).json({
          error: true,
          message: "Error : Cliente não encontrado!",
        });
      }
      else if (existingEmail) {

        const client = await prisma.user.update({
          where: {
            id: Number(id),
          },
          data: {
            nome
          },
        });

        return response.status(200).json({
          error: true,
          message: "Sucesso : Email já existe, porém nome atualizado!",
          client
        });
      }
      const client = await prisma.user.update({
        where: {
          id: Number(id),
        },
        data: {
          nome,
          email:email !== existingEmail.email ? {set : email} : undefined,
        },
      });

      return response.status(200).json({
        error: false,
        message: "Sucesso : Cliente atualizado!",
        client,
      });
    } catch (error) {
      return response.status(500).json({ message: error.message });
    }
  },

  async deleteClient(request: Request, response: Response) {
    try {
      const { id } = request.params;

      if (!id) {
        return response.status(400).json({
          error: true,
          message: "Erro: ID do cliente não fornecido.",
        });
      }

      const clientExist = await prisma.user.findUnique({
        where: { id: Number(id) },
      });

      if (!clientExist) {
        return response.status(404).json({
          error: true,
          message: "Error : Cliente não encontrado!",
        });
      }

      const client = await prisma.user.delete({
        where: {
          id: Number(id),
        },
      });

      return response.status(200).json({
        error: false,
        message: "Cliente deletado com sucesso",
        client,
      });
    } catch (error) {
      return response.status(500).json({ message: error.message });
    }
  },
};
