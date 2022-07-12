/**
 * @generated SignedSource<<e863157f3bafeb99fffaadd689054838>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ProcessUploadsFragment$data = {
  readonly content: ReadonlyArray<{
    readonly id: string;
    readonly resource: {
      readonly id: string;
    };
  }>;
  readonly id: string;
  readonly " $fragmentType": "ProcessUploadsFragment";
};
export type ProcessUploadsFragment$key = {
  readonly " $data"?: ProcessUploadsFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"ProcessUploadsFragment">;
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
  "name": "ProcessUploadsFragment",
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

(node as any).hash = "17c5d82c70e1ccd15cd7427d1ff9cf20";

export default node;
