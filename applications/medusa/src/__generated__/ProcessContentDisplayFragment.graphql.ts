/**
 * @generated SignedSource<<ffdcd78379502da336a401cc3b5bc360>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ProcessContentDisplayFragment$data = {
  readonly content: ReadonlyArray<{
    readonly id: string;
    readonly resource: {
      readonly failed: boolean;
      readonly processed: boolean;
      readonly progress: {
        readonly progress: number;
      } | null;
    };
    readonly " $fragmentSpreads": FragmentRefs<"ExpandableResourceInfoFragment">;
  }>;
  readonly id: string;
  readonly " $fragmentType": "ProcessContentDisplayFragment";
};
export type ProcessContentDisplayFragment$key = {
  readonly " $data"?: ProcessContentDisplayFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"ProcessContentDisplayFragment">;
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
  "name": "ProcessContentDisplayFragment",
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
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "failed",
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "processed",
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "concreteType": "ResourceProgress",
              "kind": "LinkedField",
              "name": "progress",
              "plural": false,
              "selections": [
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "progress",
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
          "name": "ExpandableResourceInfoFragment"
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Post",
  "abstractKey": null
};
})();

(node as any).hash = "1b94f207b2fd3da2bcacf21a531ab700";

export default node;
