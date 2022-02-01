/**
 * @generated SignedSource<<db48d61381f1610c742788c42c67185e>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ArrangeUploadsFragment$data = {
  readonly id: string;
  readonly content: ReadonlyArray<{
    readonly id: string;
    readonly urls: ReadonlyArray<{
      readonly url: string;
    }>;
    readonly " $fragmentSpreads": FragmentRefs<"DraggableContentFragment">;
  }>;
  readonly " $fragmentType": "ArrangeUploadsFragment";
};
export type ArrangeUploadsFragment = ArrangeUploadsFragment$data;
export type ArrangeUploadsFragment$key = {
  readonly " $data"?: ArrangeUploadsFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"ArrangeUploadsFragment">;
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
  "name": "ArrangeUploadsFragment",
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
        },
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "DraggableContentFragment"
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Post",
  "abstractKey": null
};
})();

(node as any).hash = "7e3330519ad1d875dc1b559deb8b1fa8";

export default node;
