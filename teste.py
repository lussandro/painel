
class ConsultaNome(Resource):
    def get(self):
        nome = request.args.get('nome')

        
        # Consultar na base contatos.db
        conn_contatos = connect_db('contatos.db')
        cur_contatos = conn_contatos.cursor()
        cur_contatos.execute("SELECT CPF, SEXO, NASC, NOME_MAE, NOME_PAI, CADASTRO_ID, ESTCIV, RG, NACIONALID, CONTATOS_ID_CONJUGE, SO, CD_SIT_CAD, DT_SIT_CAD, DT_INFORMACAO, CBO, ORGAO_EMISSOR, UF_EMISSAO, DT_OB, CD_MOSAIC, RENDA, FAIXA_RENDA_ID, TITULO_ELEITOR, CD_MOSAIC_NOVO, CD_MOSAIC_SECUNDARIO FROM SRS_CONTATOS WHERE NOME=?", (nome,))
        contatos_data = cur_contatos.fetchone()
        conn_contatos.close()
        
        if contatos_data:
            cpf = contatos_data[0]            
            print(contatos_data)
            # Consultar na base datasus.db
            conn_datasus = connect_db('datasus.db')
            cur_datasus = conn_datasus.cursor()
            cur_datasus.execute("SELECT cns, mae, pai, municipioNasci, enderecoMuni, enderecoLogr, enderecoNu, enderecoBa, enderecoCe, rgNumero, rgOrgaoEmi, rgUf, rgDataEmissao, telefone, telefone2, telefone3 FROM cadastros WHERE cpf=?", (cpf,))
            datasus_data = cur_datasus.fetchone()
            conn_datasus.close()
        else:
            return {'message': 'Nome not found'}, 404

        if contatos_data or datasus_data:
            complete_data = self.merge_data(contatos_data, datasus_data)
            return jsonify({'complete_data': complete_data})
        else:
            return {'message': 'Nome not found'}, 404

    def merge_data(self, contatos_data, datasus_data):
        complete_data = {}
        if contatos_data:
            complete_data.update({'NOME': contatos_data[0], 'SEXO': contatos_data[1], 'NASC': contatos_data[2], 'NOME_MAE': contatos_data[3], 'NOME_PAI': contatos_data[4], 'CPF': contatos_data[5], 'CADASTRO_ID': contatos_data[6], 'ESTCIV': contatos_data[7], 'RG': contatos_data[8], 'NACIONALID': contatos_data[9], 'CONTATOS_ID_CONJUGE': contatos_data[10], 'SO': contatos_data[11], 'CD_SIT_CAD': contatos_data[12], 'DT_SIT_CAD': contatos_data[13], 'DT_INFORMACAO': contatos_data[14], 'CBO': contatos_data[15], 'ORGAO_EMISSOR': contatos_data[16], 'UF_EMISSAO': contatos_data[17], 'DT_OB': contatos_data[18], 'CD_MOSAIC': contatos_data[19], 'RENDA': contatos_data[20], 'FAIXA_RENDA_ID': contatos_data[21], 'TITULO_ELEITOR': contatos_data[22], 'CD_MOSAIC_NOVO': contatos_data[23], 'CD_MOSAIC_SECUNDARIO': contatos_data[24]})
            if contatos_data[15]:
                occupation_description = get_occupation_description(contatos_data[15])
                complete_data['OCUPACAO'] = occupation_description
        if datasus_data:
            complete_data.update({'NOME_MAE': datasus_data[0], 'NOME_PAI': datasus_data[1], 'municipioNasci': datasus_data[2], 'enderecoMuni': datasus_data[3], 'enderecoLogr': datasus_data[4], 'enderecoNu': datasus_data[5], 'enderecoBa': datasus_data[6], 'enderecoCe': datasus_data[7], 'rgNumero': datasus_data[8], 'rgOrgaoEmi': datasus_data[9], 'rgUf': datasus_data[10], 'rgDataEmissao': datasus_data[11], 'cns': datasus_data[12], 'telefone': datasus_data[13], 'telefone2': datasus_data[14], 'telefone3': datasus_data[15]})
        dados_mosaico = ler_dados_mosaico()
        if contatos_data[23]:
            complete_data['MOSAICO_NOVO'] = dados_mosaico.get(contatos_data[23], "Não encontrado")
        if contatos_data[24]:
            complete_data['MOSAICO_SECUNDARIO'] = dados_mosaico.get(contatos_data[24], "Não encontrado")
        return complete_data
