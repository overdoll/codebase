/**
 * @generated SignedSource<<9932a55e1d0f36d0e0be6224bf52390b>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
export type ResourceType = "IMAGE" | "VIDEO" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type PostSimpleMediaFragment$data = {
  readonly type: ResourceType;
  readonly " $fragmentSpreads": FragmentRefs<"ImageSnippetFragment" | "ControlledVideoFragment">;
  readonly " $fragmentType": "PostSimpleMediaFragment";
};
export type PostSimpleMediaFragment = PostSimpleMediaFragment$data;
export type PostSimpleMediaFragment$key = {
  readonly " $data"?: PostSimpleMediaFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"PostSimpleMediaFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "PostSimpleMediaFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "type",
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ImageSnippetFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ControlledVideoFragment"
    }
  ],
  "type": "Resource",
  "abstractKey": null
};

(node as any).hash = "bd78b63ac74f2771e1253806db0bfd67";

export default node;
