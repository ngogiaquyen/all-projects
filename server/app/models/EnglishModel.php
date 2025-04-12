<?php
class EnglishModel extends Model
{

    public function readVocabulary($arg)
    {
        $sql = "SELECT * FROM vocabulary ORDER BY id DESC";

        try {
            $stmt = $this->conn->prepare($sql);
            $stmt->execute();
            return $stmt->fetchAll(PDO::FETCH_ASSOC);
        } catch (PDOException $e) {
            handleError($e);
        }
    }
    public function createVocabulary($data)
    {
        return $this->create('vocabulary', $data);
    }

    public function updateVocabulary($data, $id)
    {
        $conditions = "id = " . $id;
        return $this->update('vocabulary', $data, $conditions);
    }
    public function deleteVocabulary($id)
    {
        $conditions = "id = " . $id;
        return $this->delete('vocabulary', $conditions);
    }

}