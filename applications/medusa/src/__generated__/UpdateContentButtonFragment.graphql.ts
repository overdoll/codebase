/**
 * @generated SignedSource<<bf252281a17b9161e3ddcc8c87dfd72b>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type UpdateContentButtonFragment$data = {
  readonly id: string;
  readonly content: ReadonlyArray<{
    readonly id: string;
    readonly urls: ReadonlyArray<{
      readonly url: string;
    }>;
  }>;
  readonly " $fragmentType": "UpdateContentButtonFragment";
};
export type UpdateContentButtonFragment = UpdateContentButtonFragment$data;
export type UpdateContentButtonFragment$key = {
  readonly " $data"?: UpdateContentButtonFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"UpdateContentButtonFragment">;
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
  "name": "UpdateContentButtonFragment",
  "selections": [
    (v0/*: any*/),
    {
      "alias": null,
      "args": null,
      "concreteType": "Resource",
      "kind": "LinkedField",
      "name": "content",
      "plural": true,
      "selections": [
        (v0/*: any*/),
        {
          "alias": null,
          "args": null,
          "concreteType": "ResourceUrl",
          "kind": "LinkedField",
          "name": "urls",
          "plural": true,
          "selections": [
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "url",
              "storageKey": null
            }
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

(node as any).hash = "202c11cf1f81e94e02bd2fe477bbeed6";

export default node;
