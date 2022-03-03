/**
 * @generated SignedSource<<b6e3e94463c801bd2d2af2f39403541d>>
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
    readonly resource: {
      readonly id: string;
      readonly urls: ReadonlyArray<{
        readonly url: string;
      }>;
      readonly " $fragmentSpreads": FragmentRefs<"DraggableContentFragment">;
    };
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
      "storageKey": null
    }
  ],
  "type": "Post",
  "abstractKey": null
};
})();

(node as any).hash = "632ee9b9ff26226bf3650dbf3b7821b1";

export default node;
