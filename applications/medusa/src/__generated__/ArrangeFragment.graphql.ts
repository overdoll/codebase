/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ArrangeFragment = {
    readonly content: ReadonlyArray<{
        readonly id: string;
        readonly urls: ReadonlyArray<{
            readonly url: unknown;
            readonly mimeType: string;
        }>;
    }>;
    readonly " $fragmentRefs": FragmentRefs<"ArrangeUploadsFragment" | "ProcessUploadsFragment">;
    readonly " $refType": "ArrangeFragment";
};
export type ArrangeFragment$data = ArrangeFragment;
export type ArrangeFragment$key = {
    readonly " $data"?: ArrangeFragment$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"ArrangeFragment">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ArrangeFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "Resource",
      "kind": "LinkedField",
      "name": "content",
      "plural": true,
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
        }
      ],
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ArrangeUploadsFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ProcessUploadsFragment"
    }
  ],
  "type": "Post",
  "abstractKey": null
};
(node as any).hash = 'f7c9d2ccddaea75be9ba69d8d6b6363d';
export default node;
