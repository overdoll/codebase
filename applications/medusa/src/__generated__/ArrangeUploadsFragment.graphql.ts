/**
 * @generated SignedSource<<c2e96de8a0b4cfb780ed97ff5f9058a3>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ArrangeUploadsFragment$data = {
  readonly content: ReadonlyArray<{
    readonly id: string;
    readonly isSupporterOnly: boolean;
    readonly resource: {
      readonly id: string;
      readonly urls: ReadonlyArray<{
        readonly url: string;
      }>;
    };
    readonly " $fragmentSpreads": FragmentRefs<"DraggableContentFragment">;
  }>;
  readonly id: string;
  readonly " $fragmentSpreads": FragmentRefs<"ArrangeButtonFragment">;
  readonly " $fragmentType": "ArrangeUploadsFragment";
};
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
          "kind": "ScalarField",
          "name": "isSupporterOnly",
          "storageKey": null
        },
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
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ArrangeButtonFragment"
    }
  ],
  "type": "Post",
  "abstractKey": null
};
})();

(node as any).hash = "9eaec398ddb5dca9155345505ff939c2";

export default node;
