/**
 * @generated SignedSource<<d63cd30129bccaf994fa617a5c854db0>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
export type ResourceType = "IMAGE" | "VIDEO" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type DraggableContentFragment$data = {
  readonly id: string;
  readonly type: ResourceType;
  readonly urls: ReadonlyArray<{
    readonly url: string;
    readonly mimeType: string;
  }>;
  readonly " $fragmentSpreads": FragmentRefs<"ResourceInfoFragment">;
  readonly " $fragmentType": "DraggableContentFragment";
};
export type DraggableContentFragment = DraggableContentFragment$data;
export type DraggableContentFragment$key = {
  readonly " $data"?: DraggableContentFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"DraggableContentFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "DraggableContentFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "id",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "type",
      "storageKey": null
    },
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
      "args": null,
      "kind": "FragmentSpread",
      "name": "ResourceInfoFragment"
    }
  ],
  "type": "Resource",
  "abstractKey": null
};

(node as any).hash = "7777cf09d01745ccfff9fb1b4afc35df";

export default node;
