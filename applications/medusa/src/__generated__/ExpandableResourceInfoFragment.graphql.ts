/**
 * @generated SignedSource<<431962a122bb37b9f1caae2047eecda3>>
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
    readonly preview: string;
    readonly processed: boolean;
    readonly " $fragmentSpreads": FragmentRefs<"PreviewMediaFragment">;
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
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "preview",
          "storageKey": null
        },
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "PreviewMediaFragment"
        }
      ],
      "storageKey": null
    }
  ],
  "type": "PostContent",
  "abstractKey": null
};

(node as any).hash = "c7ebe29929eeeef6f643bc4b638c8a12";

export default node;
