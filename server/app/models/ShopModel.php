<?php
class ShopModel extends Model
{
    public function createApplicant($data)
    {
        return $this->create('applicants', $data);
    }
    public function readProducts($arg)
    {
        $sql = "SELECT p.id, p.name, p.price, p.original_price, p.discount, i.image_url AS image, p.rating, p.sales_count
         FROM products AS p
            INNER JOIN product_images as i ON p.id = i.product_id
            WHERE i.is_primary = 1
        ";


        try {
            $stmt = $this->conn->prepare($sql);
            $stmt->execute();
            return $stmt->fetchAll(PDO::FETCH_ASSOC);
        } catch (PDOException $e) {
            handleError($e);
        }
    }
    public function productDetail($id)
    {
        $sql = "
                SELECT p.id,
                p.name,
                p.description,
                p.price,
                p.original_price AS originalPrice,
                p.discount,
                ca.id AS category,
                ca.name AS categoryName,
                JSON_ARRAYAGG(i.image_url) AS images,
                p.stock,
                p.rating,
                p.reviews_count AS reviews,
                p.sales_count as sales,
                JSON_ARRAYAGG(fe.feature_name) AS features,
                JSON_ARRAYAGG(JSON_OBJECT('name', sp.spec_name , 'value', sp.spec_value )) AS specifications

            FROM products AS p
            JOIN product_images as i ON p.id = i.product_id
            JOIN categories AS ca ON ca.id = p.categorie_id
            JOIN product_features AS fe ON fe.product_id = p.id
            JOIN product_specifications AS sp ON sp.product_id = p.id
            WHERE p.id = :id
        ";

        // $sql2 = "SELECT VERSION();";


        try {
            $stmt = $this->conn->prepare($sql);
            $stmt->execute(['id'=>$id]);
            return $stmt->fetchAll(PDO::FETCH_ASSOC);
        } catch (PDOException $e) {
            handleError($e);
        }
    }
    public function updateApplicant($data, $id = 0)
    {
        if (empty($id)) {
            handleError('Vui lòng chọn một ứng viên');
        }

        $conditions = "id=$id";
        return $this->update('applicants', $data, $conditions);
    }

}