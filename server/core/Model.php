<?php
class Model
{
    protected $conn;
    public function __construct()
    {
        $this->conn = Db::getInstance()->getConnection();
    }
    public function beginTransaction()
    {
        $this->conn->beginTransaction();
    }
    public function commitNotify($title, $message, $keep = false)
    {
        $this->conn->commit();
        handleNotify(1, $title, $message, $keep);
    }
    public function commit($message, $keep = false)
    {
        $this->conn->commit();
        handleSuccess($message, $keep);
    }
    public function rollback($message, $keep = false)
    {
        $this->conn->rollback();
        handleError($message, $keep);
    }
    public function create($table, $data)
    {
        $key = implode(", ", array_keys($data));
        $placeholders = ":" . implode(", :", array_keys($data));
        $sql = "INSERT INTO $table ($key) VALUES ($placeholders)";
        try {
            $stmt = $this->conn->prepare($sql);
            foreach ($data as $key => $value) {
                $stmt->bindValue(":$key", $value);
            }
            $stmt->execute();
            return $this->conn->lastInsertId();
        } catch (PDOException $e) {
            return false;
        }
    }
    public function read($table, $conditions = "")
    {
        if (!isset($this->conn)) {
            return [];
        }
        $sql = "SELECT * FROM $table" . ($conditions ? " WHERE $conditions" : "") . "";
        try {
            $stmt = $this->conn->prepare($sql);
            $stmt->execute();
            return $stmt->fetchAll(PDO::FETCH_ASSOC);
        } catch (PDOException $e) {
            return [];
        }
    }
    public function update($table, $data, $conditions = "")
    {
        $set = "";
        foreach ($data as $key => $value) {
            $set .= "$key = :$key, ";
        }
        $set = rtrim($set, ", ");
        $sql = "UPDATE $table SET $set WHERE $conditions";
        try {
            $stmt = $this->conn->prepare($sql);
            foreach ($data as $key => $value) {
                $stmt->bindValue(":$key", $value);
            }
            $stmt->execute();
            return $stmt->rowCount();
        } catch (PDOException $e) {
            return 0;
        }
    }
    public function delete($table, $conditions = "")
    {
        $sql = "DELETE FROM $table WHERE $conditions";
        try {
            $stmt = $this->conn->prepare($sql);
            $stmt->execute();
            return $stmt->rowCount();
        } catch (PDOException $e) {
            return 0;
        }
    }
}