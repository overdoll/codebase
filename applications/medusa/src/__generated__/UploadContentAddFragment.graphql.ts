/**
 * @generated SignedSource<<a9b85d1690795ebbbe8002996f40e13f>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type UploadContentAddFragment$data = {
  readonly content: ReadonlyArray<{
    readonly id: string;
    readonly resource: {
      readonly id: string;
    };
  }>;
  readonly id: string;
  readonly " $fragmentType": "UploadContentAddFragment";
};
export type UploadContentAddFragment$key = {
  readonly " $data"?: UploadContentAddFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"UploadContentAddFragment">;
};

const node: ReaderFragment = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
};
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "UploadContentAddFragment",
  "selections": [
    (v0/*: any*/),
    {
      "alias": null,
      "args": null,
      "concreteType": "PostContent",
      "kind": "LinkedField",
      "name": "content",
      "plural": true,
      "selections": [
        (v0/*: any*/),
        {
          "alias": null,
          "args": null,
          "concreteType": "Resource",
          "kind": "LinkedField",
          "name": "resource",
          "plural": false,
          "selections": [
            (v0/*: any*/)
          ],
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Post",
  "abstractKey": null
};
})();

(node as any).hash = "969b50aa541e70081583a0f764f594ac";

export default node;
