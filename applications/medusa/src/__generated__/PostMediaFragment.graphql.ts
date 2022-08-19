/**
 * @generated SignedSource<<2c072a2758a2c78c5100ceb83f3f1d42>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
export type ResourceType = "IMAGE" | "VIDEO" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type PostMediaFragment$data = {
  readonly height: number;
  readonly type: ResourceType;
  readonly width: number;
  readonly " $fragmentSpreads": FragmentRefs<"ImageSnippetFragment" | "PostVideoMediaFragment">;
  readonly " $fragmentType": "PostMediaFragment";
};
export type PostMediaFragment$key = {
  readonly " $data"?: PostMediaFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"PostMediaFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "PostMediaFragment",
  "selections": [
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
      "args": null,
      "kind": "FragmentSpread",
      "name": "ImageSnippetFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "PostVideoMediaFragment"
    }
  ],
  "type": "Resource",
  "abstractKey": null
};

(node as any).hash = "3125b83b556a36928cf751e3ddeadaef";

export default node;
