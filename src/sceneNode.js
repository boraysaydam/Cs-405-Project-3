/**
 * @class SceneNode
 * @desc A SceneNode is a node in the scene graph.
 * @property {MeshDrawer} meshDrawer - The MeshDrawer object to draw
 * @property {TRS} trs - The TRS object to transform the MeshDrawer
 * @property {SceneNode} parent - The parent node
 * @property {Array} children - The children nodes
 */

class SceneNode {
    constructor(meshDrawer, trs, parent = null) {
        this.meshDrawer = meshDrawer;
        this.trs = trs;
        this.parent = parent;
        this.children = [];

        if (parent) {
            this.parent.__addChild(this);
        }
    }

    __addChild(node) {
        this.children.push(node);
    }

    draw(mvp, modelView, normalMatrix, modelMatrix) {
        /**
         * @Task1 : Implement the draw function for the SceneNode class.
         */
        
        var transformedMvp = mvp;
        var transformedModelView = modelView;
        var transformedNormals = normalMatrix;
        var transformedModel = modelMatrix;
    
       /**
        * Function to calculate updated transformation matrices for the current node.
        */
        function updateTransformMatrices(baseMatrix, trsObject) {
          return MatrixMult(baseMatrix, trsObject.getTransformationMatrix());
        }

        /**
        * Function to recursively handle the rendering of child nodes.
        */
        function processChildNodes(childList, updatedMvp, updatedModelView, updatedNormalMatrix, updatedModelMatrix) {
          for (let childNode of childList) {
            childNode.draw(updatedMvp, updatedModelView, updatedNormalMatrix, updatedModelMatrix);
         }
}

        // Step 1: Compute transformations for the current node
        const nodeModelMatrix = updateTransformMatrices(transformedModel, this.trs);
        const nodeModelViewMatrix = updateTransformMatrices(transformedModelView, this.trs);
        const nodeNormalMatrix = updateTransformMatrices(transformedNormals, this.trs);
        const nodeMvpMatrix = updateTransformMatrices(transformedMvp, this.trs);

        // Step 2: Render the mesh for the current node (if it has a MeshDrawer)
        if (this.meshDrawer) {
          this.meshDrawer.draw(nodeMvpMatrix, nodeModelViewMatrix, nodeNormalMatrix, nodeModelMatrix);
        }

        // Step 3: Render child nodes recursively
        processChildNodes(this.children, nodeMvpMatrix, nodeModelViewMatrix, nodeNormalMatrix, nodeModelMatrix);
    }

}