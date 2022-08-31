/**
 * @generated SignedSource<<d9ff88a9de1dad6f199d154d7f83658a>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ExpandableResourceInfoFragment$data = {
  readonly resource: {
    readonly processed: boolean;
    readonly " $fragmentSpreads": FragmentRefs<"MediaPreviewModalFragment">;
  };
  readonly " $fragmentSpreads": FragmentRefs<"ResourceInfoFragment">;
  readonly " $fragmentType": "ExpandableResourceInfoFragment";
};
export type ExpandableResourceInfoFragment$key = {
  readonly " $data"?: ExpandableResourceInfoFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"ExpandableResourceInfoFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ExpandableResourceInfoFragment",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ResourceInfoFragment"
    },
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
          "name": "processed",
          "storageKey": null
        },
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "MediaPreviewModalFragment"
        }
      ],
      "storageKey": null
    }
  ],
  "type": "PostContent",
  "abstractKey": null
};

(node as any).hash = "277c723ce131fb9f2b8972de6197eda6";

export default node;
