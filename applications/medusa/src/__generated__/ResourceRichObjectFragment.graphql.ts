/**
 * @generated SignedSource<<fd7c02588fc694f50138e2e703fc4ecb>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
export type ResourceType = "IMAGE" | "VIDEO" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type ResourceRichObjectFragment$data = {
  readonly height: number;
  readonly type: ResourceType;
  readonly urls: ReadonlyArray<{
    readonly mimeType: string;
    readonly url: string;
  }>;
  readonly width: number;
  readonly " $fragmentType": "ResourceRichObjectFragment";
};
export type ResourceRichObjectFragment$key = {
  readonly " $data"?: ResourceRichObjectFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"ResourceRichObjectFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ResourceRichObjectFragment",
  "selections": [
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
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "mimeType",
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "width",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "height",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "type",
      "storageKey": null
    }
  ],
  "type": "Resource",
  "abstractKey": null
};

(node as any).hash = "377c8db4c0fc58b5cead8c4d4b550dd3";

export default node;
